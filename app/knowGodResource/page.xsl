<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:t="https://mobile-content-api.cru.org/xmlns/tract" xmlns:c="https://mobile-content-api.cru.org/xmlns/content" exclude-result-prefixes="t c">
  <xsl:output method="xml" encoding="utf-8" />
  <xsl:template match="/">
          <xsl:apply-templates />
  </xsl:template>

  <xsl:template match="t:page/t:header">
    <div class="py25 kg-bg-blue kg-white">
      <h1 class="fl ml25 kg-white"><xsl:value-of select="t:number/c:text" /></h1>
      <h2 class="mx100 kg-white"><xsl:value-of select="t:title/c:text" /></h2>
    </div>
  </xsl:template>

  <xsl:template match="t:page/t:cards/t:card">
    <div class="mx100">

      <xsl:apply-templates />

    </div>
  </xsl:template>

  <xsl:template match="t:hero">
    <div class="mx100">
      <xsl:apply-templates />
    </div>
  </xsl:template>

  <xsl:template match="t:heading">
      <h1 class="kg-blue"><xsl:value-of select="c:text" /></h1>
  </xsl:template>

  <xsl:template match="c:paragraph">
    <p>
      <xsl:apply-templates/>
    </p>
  </xsl:template>

  <xsl:template match="c:button">
    <a class="button w100 kg-bg-blue kg-white">
      <xsl:if test="@type='url'">
        <xsl:attribute name="href">http://www.<xsl:value-of select="./@url" /></xsl:attribute>
      </xsl:if>
      <xsl:if test="@type='event'">
        <xsl:attribute name="href">eevent</xsl:attribute>
      </xsl:if>

      <xsl:apply-templates/>
    </a>
  </xsl:template>

  <xsl:template match="c:tabs/c:tab">
    <div>
      <xsl:apply-templates />
    </div>
  </xsl:template>

  <xsl:template match="c:paragraph//c:text">
    <span>
      <xsl:attribute name="class">db</xsl:attribute>
      <xsl:apply-templates select="@text-align"/>
      <xsl:value-of select="." />
    </span>
  </xsl:template>

  <xsl:template match="t:label">
    <h2><xsl:value-of select="c:text" /></h2>
  </xsl:template>

  <xsl:template match="c:label">
    <h2><xsl:value-of select="c:text" /></h2>
  </xsl:template>

  <xsl:template match="c:paragraph//c:image">
    <xsl:element name="img">
      <xsl:attribute name="image-resource">
        <xsl:value-of select="@resource"/>
      </xsl:attribute>
    </xsl:element>
  </xsl:template>

  <xsl:template match="@text-align">
    <xsl:attribute name="text-align">
      <xsl:value-of select="@text-align"/>
    </xsl:attribute>
  </xsl:template>



  <xsl:template match="t:page/t:call-to-action">
    <div class="mx100">
      <h3><xsl:value-of select="c:text" /></h3>
    </div>
  </xsl:template>

</xsl:stylesheet>